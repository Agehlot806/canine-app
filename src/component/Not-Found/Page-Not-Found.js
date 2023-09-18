
import error from "../../assets/images/video/error404.gif"
export default function Notfound()
{
    return<>
    <div className="section-padding">
        <div className="container">
            <div className="justify-content-center row">
                <div className="col-lg-8">
                    <div className="gif">
                    <img src={error} alt="error"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </>
}