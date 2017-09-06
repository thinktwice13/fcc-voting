import React from "react"
import { TwitterButton, RedditButton } from "react-social"
import Button from "react-md/lib/Buttons"

export default props => {
  return (
    <div className="shares">
      <span>
        <Button icon>share</Button>
      </span>
      <span className="hidden">
        <TwitterButton
          url={"http://www.google.com"}
          element={() => <Button icon iconClassName="fa fa-twitter" />}
        />
        <RedditButton
          url={"http://www.google.com"}
          element={() => <Button icon iconClassName="fa fa-reddit" />}
        />
      </span>
    </div>
  )
}
