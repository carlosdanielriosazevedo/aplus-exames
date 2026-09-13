import {getServerAuth} from "../../../lib/server/auth";

export const runtime="nodejs";
export const dynamic="force-dynamic";

const auth=getServerAuth();
export const {GET,POST}=auth.handler();
