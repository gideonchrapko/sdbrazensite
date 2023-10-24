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
      {status === "sending" && (
        <div style={{ paddingRight: "5px" }}>sending...</div>
      )}
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
