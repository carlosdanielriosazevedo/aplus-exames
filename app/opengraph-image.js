import {ImageResponse} from 'next/og';

export const alt='APProva+ · Preparação inteligente para exames nacionais';
export const size={width:1200,height:630};
export const contentType='image/png';

export default function OpenGraphImage(){
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'72px 84px',background:'#08132e',color:'white',fontFamily:'Arial, sans-serif'}}>
      <div style={{display:'flex',alignItems:'center',fontSize:42,fontWeight:900,letterSpacing:-1}}>
        <span style={{color:'#ffffff'}}>APProva</span><span style={{color:'#f59e0b'}}>+</span>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:24,maxWidth:920}}>
        <div style={{fontSize:70,lineHeight:1.05,fontWeight:900,letterSpacing:-3}}>A tua melhor nota começa aqui.</div>
        <div style={{fontSize:30,lineHeight:1.35,color:'#cbd5e1'}}>Preparação inteligente e adaptativa para Matemática A, Português e Física e Química A.</div>
      </div>
      <div style={{display:'flex',fontSize:22,color:'#94a3b8'}}>approvamais.pt</div>
    </div>,
    size
  );
}
