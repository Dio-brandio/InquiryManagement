import styles  from "@/styles/loading.module.css"

const Loading = () => {
    return (
        <>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
          <div className={styles.wave}>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
        </div>  
            </div>  
        </div>
          
        </>
    )
}

export default Loading