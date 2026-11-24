"""Local APP EN archive index. Never copies source material into Git."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import sqlite3
import tempfile


def outside_git(path):
    path = path.resolve()
    for parent in (path, *path.parents):
        marker = parent / '.git'
        if marker.is_file() or (marker / 'HEAD').is_file():
            raise ValueError('Original export and index must be outside every Git checkout')
    return path


def rebuild(source, destination, selected):
    source, destination = outside_git(source), outside_git(destination)
    raw = source.read_bytes()
    conversations = json.loads(raw)
    if not isinstance(conversations, list):
        raise ValueError('Expected conversations.json list; format not supported')
    ids = [str(c.get('id', '')) for c in conversations]
    if len(ids) != len(set(ids)) or not all(ids):
        raise ValueError('Missing or duplicate conversation IDs')
    missing = selected - set(ids)
    if missing:
        raise ValueError('Selected conversation IDs missing from export')
    destination.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(dir=destination.parent, suffix='.sqlite')
    os.close(fd)
    try:
        with sqlite3.connect(temporary) as db:
            db.executescript('''
            CREATE TABLE provenance(source TEXT, sha256 TEXT, selected_ids TEXT);
            CREATE TABLE conversations(id TEXT PRIMARY KEY, title TEXT, created REAL, updated REAL, original TEXT);
            CREATE TABLE messages(conversation_id TEXT, node_id TEXT, created REAL, role TEXT, original TEXT);
            CREATE VIRTUAL TABLE search USING fts5(conversation_id UNINDEXED, node_id UNINDEXED, title, body, tokenize='unicode61 remove_diacritics 2');
            ''')
            db.execute('INSERT INTO provenance VALUES(?,?,?)', (str(source), hashlib.sha256(raw).hexdigest(), json.dumps(sorted(selected))))
            for c in conversations:
                cid = str(c['id'])
                if cid not in selected:
                    continue
                if not isinstance(c.get('mapping'), dict):
                    raise ValueError('Selected conversation has no supported message mapping')
                title = c.get('title', '')
                db.execute('INSERT INTO conversations VALUES(?,?,?,?,?)', (cid, title, c.get('create_time'), c.get('update_time'), json.dumps(c, ensure_ascii=False)))
                # All branches, corrections and attachment metadata, not just current_node ancestry.
                for nid, node in c.get('mapping', {}).items():
                    msg = node.get('message') or {}
                    body = json.dumps(node, ensure_ascii=False)
                    db.execute('INSERT INTO messages VALUES(?,?,?,?,?)', (cid, nid, msg.get('create_time'), msg.get('author', {}).get('role'), body))
                    db.execute('INSERT INTO search VALUES(?,?,?,?)', (cid, nid, title, body))
                db.execute('INSERT INTO search VALUES(?,?,?,?)', (cid, '', title, json.dumps(c, ensure_ascii=False)))
            assert db.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
        os.chmod(temporary, 0o600)
        os.replace(temporary, destination)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)
    return len(selected)


def main():
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest='command', required=True)
    imp = sub.add_parser('import')
    imp.add_argument('--source', required=True, type=Path)
    imp.add_argument('--index', required=True, type=Path)
    imp.add_argument('--selection', required=True, type=Path, help='JSON list of explicitly confirmed APP EN conversation IDs')
    search = sub.add_parser('search')
    search.add_argument('--index', required=True, type=Path)
    search.add_argument('--query', default='')
    search.add_argument('--title', default='')
    search.add_argument('--after', type=float, help='Inclusive Unix timestamp, conversation creation')
    search.add_argument('--before', type=float, help='Exclusive Unix timestamp, conversation creation')
    search.add_argument('--limit', type=int, default=20)
    args = p.parse_args()
    if args.command == 'import':
        selected = json.loads(outside_git(args.selection).read_text())
        if not isinstance(selected, list) or not selected or not all(isinstance(x, str) for x in selected):
            p.error('Selection must be a nonempty JSON list of IDs')
        count = rebuild(args.source, args.index, set(selected))
        print(json.dumps({'imported_conversations': count, 'index': str(args.index)}))
    else:
        index = outside_git(args.index)
        with sqlite3.connect(index.as_uri() + '?mode=ro', uri=True) as db:
            where, values = ['instr(lower(c.title),lower(?))>0'], [args.title]
            if args.query:
                where.append('search MATCH ?')
                values.append(args.query)
            for operator, value in [('>=', args.after), ('<', args.before)]:
                if value is not None:
                    where.append('c.created '+operator+' ?')
                    values.append(value)
            sql = 'SELECT DISTINCT c.id,c.title,c.created,s.node_id,substr(s.body,1,400) FROM search s JOIN conversations c ON c.id=s.conversation_id WHERE '+ ' AND '.join(where) +' ORDER BY c.created,c.id,s.node_id LIMIT ?'
            for row in db.execute(sql, [*values, max(1, min(args.limit, 1000))]):
                print(json.dumps(dict(zip(['conversation_id','title','created','node_id','excerpt'],row)), ensure_ascii=False))


if __name__ == '__main__':
    main()
