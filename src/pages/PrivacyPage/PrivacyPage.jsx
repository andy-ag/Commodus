import './PrivacyPage.css';

export default function PrivacyPage() {
    return (
        <div className="container my-4 w-50">
            <div className="row">
                <div className="col text-start">
                    <h1 className="mb-4">Privacy Policy</h1>

                    <h2>1. Personal Information</h2>
                    <p>
                        When you register for an account on Commodus, we ask for your name and email address. This information is used to provide you with our services and to allow you to log in to your account. We will not share your personal information with third parties or sell it to other companies.
                    </p>

                    <h2>2. Cookies</h2>
                    <p>
                        We do not use cookies on the Commodus website. This means we do not track your individual behavior on our site or store any information on your computer without your knowledge.
                    </p>

                    <h2>3. Authentication</h2>
                    <p>
                        For authentication, we use a token saved to your browser's local storage. This method does not store any personal information and is used solely to authenticate your session.
                    </p>

                    <h2>4. Security</h2>
                    <p>
                        The security of your personal information is important to us. We use various security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure.
                    </p>

                    <h2>5. Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                    </p>

                    <h2>6. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us.
                    </p>
                </div>
            </div>
        </div>
    );
}
