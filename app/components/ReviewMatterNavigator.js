"use client";
import styles from "./ReviewMatterNavigator.module.css";

export default function ReviewMatterNavigator({
  years,
  selectedYear,
  onYearChange,
  items,
  onSelect,
  yearAriaLabel,
  itemHeading,
  itemDescription,
  itemNoun="matéria"
}){
  return <section className={styles.navigator} aria-label="Escolher conteúdo para rever">
    <div className={styles.stepCard}>
      <div className={styles.stepHeading}>
        <span className={styles.stepNumber}>1</span>
        <div>
          <small>PRIMEIRO</small>
          <h2>Escolhe o ano</h2>
          <p>O mapa adapta-se ao programa desse ano sem esconder o que podes rever.</p>
        </div>
      </div>
      <div className={styles.yearGrid} role="group" aria-label={yearAriaLabel}>
        {years.map(row=>{
          const value=typeof row==="string"?row:row.value;
          const label=typeof row==="string"?row:row.label;
          const meta=typeof row==="string"?null:row.meta;
          const active=value===selectedYear;
          return <button
            type="button"
            key={value}
            className={active?styles.yearActive:styles.yearButton}
            aria-pressed={active}
            onClick={()=>onYearChange(value)}
          >
            <span>{label}</span>
            {meta&&<small>{meta}</small>}
            {active&&<b>Selecionado</b>}
          </button>;
        })}
      </div>
    </div>

    <div className={styles.stepCard}>
      <div className={styles.stepHeading}>
        <span className={styles.stepNumber}>2</span>
        <div>
          <small>DEPOIS</small>
          <h2>{itemHeading}</h2>
          <p>{itemDescription}</p>
        </div>
      </div>
      <div className={styles.itemGrid} aria-label={`${itemHeading} — ${selectedYear}`}>
        {items.map((row,index)=><button
          type="button"
          key={row.id}
          className={styles.itemCard}
          onClick={()=>onSelect(row.id)}
          aria-label={`Abrir ${itemNoun}: ${row.title}`}
        >
          <span className={styles.itemIndex}>{String(index+1).padStart(2,"0")}</span>
          <span className={styles.itemCopy}>
            {row.badge&&<small className={styles.itemBadge}>{row.badge}</small>}
            <b>{row.title}</b>
            {row.subtitle&&<small className={styles.itemSubtitle}>{row.subtitle}</small>}
            {row.meta&&<span className={styles.itemMeta}>{row.meta}</span>}
          </span>
          <span className={styles.itemArrow} aria-hidden="true">→</span>
        </button>)}
      </div>
      {items.length===0&&<p className={styles.emptyState}>Ainda não há conteúdos disponíveis para este ano.</p>}
    </div>
  </section>;
}
