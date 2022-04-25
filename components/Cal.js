import Iframe from 'react-iframe'

export default function Cal() {
  return (
    <div className="">
      <Iframe
        url="https://cal.com/clarasoftware/free-20-minute-consultation"
        width="650px"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  )
}
