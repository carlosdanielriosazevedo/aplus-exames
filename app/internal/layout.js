import {notFound} from "next/navigation";

export const metadata={robots:{index:false,follow:false}};

export default function InternalLayout({children}){
  const enabled=process.env.NODE_ENV!=="production"||process.env.APLUS_INTERNAL_TOOLS==="1";
  if(!enabled)notFound();
  return children;
}
