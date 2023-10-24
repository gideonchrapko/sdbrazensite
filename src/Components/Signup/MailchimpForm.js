import React, { useState, useEffect } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
// import PrimaryCTAButton from "./PrimaryCTAButton"
import InputField from "./InputField"

const CustomForm = ({ status, message, onValidated }) => {
  // const {modalOpen, setModalOpen} = useGHStContext();
  const [modalOpen, setModalOpen] = useState()
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      })
  }

  useEffect(() => {
    if (status === "success") clearFields()
    if (modalOpen && status === "success") clearFields()
  }, [status, modalOpen])

  const clearFields = () => {
    setEmail("")
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{ paddingLeft: "30px", paddingBottom: "5px" }}
    >
      {status === "sending" && <div>sending...</div>}
      {status === "error" && (
        <div
          dangerouslySetInnerHTML={{ __html: message }}
          style={{ paddingRight: "5px" }}
        />
      )}
      {status === "success" && (
        <div
          dangerouslySetInnerHTML={{ __html: message }}
          style={{ paddingRight: "5px" }}
        />
      )}
      <div style={{ display: "flex", paddingLeft: "10px" }}>
        {status !== "success" ? (
          <div
            className="inputTextStyling font-subscribe"
            style={{ paddingRight: "5px" }}
          >
            <InputField
              //   label="Email"
              onChangeHandler={setEmail}
              type="email"
              value={email}
              isRequired
              style={{ paddingRight: "5px" }}
            />
          </div>
        ) : null}
        {status === "success" ? (
          <h1></h1>
        ) : (
          <InputField label="subscribe" type="submit" formValues={[email]} />
        )}
      </div>
    </form>
  )
}

const MailchimpForm = (props) => {
  const url = `https://sdmusicgroup.us21.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`
  // const url = `https://siberiahills.us21.list-manage.com/subscribe/post?u=223ffd41ccda8812a7ff21bf7;id=61e0b83ece;`
  // https://siberiahills.us21.list-manage.com/subscribe/post?u=334f5088645f23797f4c3ecea&amp;id=cef89e94d4&amp;

  return (
    <div className="formDiv">
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  )
}

export default MailchimpForm
