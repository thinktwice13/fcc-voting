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
      {"Created by Mario K for "}
      <span>
        <a
          href="https://www.freecodecamp.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          freeCodeCamp
        </a>
      </span>
    </div>
  </div>
)
