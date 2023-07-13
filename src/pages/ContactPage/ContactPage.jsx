import './ContactPage.css';
import HeaderBox from '../../components/HeaderBox.jsx'

export default function ContactPage() {
    return (
      <div className="container my-4 w-50">
            <div className="row">
            <div className="col text-start">
                    <div className="d-flex justify-content-center mb-4">
                        <HeaderBox text={'Contact us'} add={false} fav={false}/>
                    </div>
                    <p>
                    At Commodus, we believe in the power of communication and we're always eager to hear from our users. Whether you have a suggestion, a query, or even a complaint, your feedback is invaluable to us. It helps us understand your needs better and continuously improve our services. We are committed to providing you with the best experience and your insights can help us achieve that.
                    </p>
                    
                    <p className="mt-5">
                    Please don't hesitate to reach out to us at: <br></br> andyageenkov@gmx.com
                    </p>
                </div>
          </div>
      </div>
    );
}
