import React from "react"
import {
  TwitterButton,
  RedditButton,
  PocketButton,
  EmailButton
} from "react-social"
import Button from "react-md/lib/Buttons"

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  handleClick = () => this.setState({ visible: true })

  handleBlur = () => this.setState({ visible: false })

  render() {
    //shared poll view URL
    const url = window.location.origin + "/polls/view/" + this.props.poll

    return (
      <div onBlur={this.handleBlur} className="shares">
        <span>
          <Button onClick={this.handleClick} icon>
            share
          </Button>
        </span>
        <span className={this.state.visible ? "visible" : "hidden"}>
          <TwitterButton
            url={url}
            message="Check this out!"
            type="button"
            className="md-inline-block md-btn md-btn--icon md-pointer--hover"
          >
            <div className="md-ink-container">
              <span aria-hidden="true" />
            </div>
            <i className="md-icon fa fa-twitter" />
          </TwitterButton>

          <RedditButton
            title={this.props.title}
            url={url}
            type="button"
            className="md-inline-block md-btn md-btn--icon md-pointer--hover"
          >
            <div className="md-ink-container">
              <span aria-hidden="true" />
            </div>
            <i className="md-icon fa fa-reddit" />
          </RedditButton>

          <PocketButton
            message={this.props.title}
            url={url}
            type="button"
            className="md-inline-block md-btn md-btn--icon md-pointer--hover"
          >
            <div className="md-ink-container">
              <span aria-hidden="true" />
            </div>
            <i className="md-icon fa fa-get-pocket" />
          </PocketButton>

          <EmailButton
            url={url}
            type="button"
            className="md-inline-block md-btn md-btn--icon md-pointer--hover"
          >
            <div className="md-ink-container">
              <span aria-hidden="true" />
            </div>
            <i className="md-icon fa fa-envelope" />
          </EmailButton>
        </span>
      </div>
    )
  }
}
