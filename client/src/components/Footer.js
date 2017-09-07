import React from "react"
import Button from "react-md/lib/Buttons"

export default () => (
  <div className="footer">
    <Button
      icon
      iconClassName="fa fa-github"
      href="https://github.com/thinktwice13/fcc-voting"
      target="_blank"
    />
    <div>
      Created by MARIO K for{" "}
      <span>
        <a href="https://www.freecodecamp.org/">freeCodeCamp</a>
      </span>
    </div>
  </div>
)
