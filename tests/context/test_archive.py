import importlib.util
import json
from pathlib import Path
import sqlite3
import tempfile
import subprocess
import sys
import unittest

spec = importlib.util.spec_from_file_location('archive', Path(__file__).parents[2] / 'scripts/context/archive.py')
archive = importlib.util.module_from_spec(spec)
spec.loader.exec_module(archive)

class ArchiveTests(unittest.TestCase):
    def test_roundtrip_all_branches_and_rebuild(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            source, index = root/'conversations.json', root/'index.sqlite'
            conversations = [{'id':'app-en','title':'Missão e XP','create_time':100,'mapping':{'a':{'message':{'content':{'parts':['decisão recuperação']}}},'b':{'message':{'content':{'parts':[{'asset_pointer':'image-file-1'}]}}}}}, {'id':'unrelated','title':'Private unrelated','mapping':{}}]
            source.write_text(json.dumps(conversations))
            self.assertEqual(archive.rebuild(source,index,{'app-en'}),1)
            archive.rebuild(source,index,{'app-en'})
            with sqlite3.connect(index) as db:
                self.assertEqual(db.execute('select count(*) from conversations').fetchone()[0],1)
                self.assertEqual(db.execute('select count(*) from messages').fetchone()[0],2)
                self.assertTrue(db.execute("select * from search where search match 'recuperacao'").fetchall())
                self.assertTrue(db.execute("select * from search where search match 'image'").fetchall())
                self.assertEqual(json.loads(db.execute('select original from conversations').fetchone()[0]), conversations[0])
            with self.assertRaises(ValueError): archive.rebuild(source,index,{'missing'})
            with sqlite3.connect(index) as db: self.assertEqual(db.execute('select count(*) from conversations').fetchone()[0],1)

    def test_cli_title_date_content(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp); source=root/'conversations.json'; index=root/'index.sqlite'
            source.write_text(json.dumps([{'id':'one','title':'XP aprovado','create_time':100,'mapping':{'node':{'message':{'content':{'parts':['missão recuperação']}}}}}]))
            archive.rebuild(source,index,{'one'})
            command=[sys.executable,str(Path(archive.__file__)),'search','--index',str(index),'--title','XP','--query','recuperacao','--after','100','--before','101']
            result=subprocess.run(command,capture_output=True,text=True,check=True)
            rows=[json.loads(row) for row in result.stdout.splitlines()]
            self.assertTrue(rows)
            self.assertEqual(rows[0]['conversation_id'],'one')
            result=subprocess.run(command[:-1]+['100'],capture_output=True,text=True,check=True)
            self.assertEqual(result.stdout,'')

    def test_reject_git_storage(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp); (root/'.git').mkdir(); (root/'.git/HEAD').write_text('ref: refs/heads/main')
            with self.assertRaises(ValueError): archive.outside_git(root/'export.json')

if __name__ == '__main__': unittest.main()
