import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

export const withAuth = ChildComponent =>
  connect(({ user }) => ({ user }))(
    props => props.user && props.user.auth && <ChildComponent {...props} />
  )
export const unauthRedirect = ChildComponent =>
  connect(({ user }) => ({ user }))(
    props =>
      props.user && props.user.auth ? (
        <ChildComponent {...props} />
      ) : (
        <Redirect to="/" />
      )
  )

// export const DashboardWithData = ChildComponent => {
//   const EnhancedComponent = props => {
//     const { user, polls } = props
//     if (!user || !polls) return null
//     if (!polls.length) {
//       return (
//         <div>
//           <ErrorPage
//             title="No polls found :("
//             msg={
//               user.auth
//                 ? "Add one yourself or try again later"
//                 : "Login and add one yourself or try again later"
//             }
//           />
//           {user.auth && <NewPollBtn />}
//         </div>
//       )
//     }
//     return <ChildComponent {...props} />
//   }
//   const mapStateToProps = ({ user, polls }) => ({ user, polls })
//   return connect(mapStateToProps)(EnhancedComponent)
// }

export const DashboardOrError = (Dashboard, ErrorPage) => {
  const EnhancedComponent = props => {
    const { user, polls } = props
    if (!user || !polls) return null
    if (!polls.length) {
      return (
        <div>
          <ErrorPage
            title="No polls found :("
            msg={
              user.auth
                ? "Add one yourself or try again later"
                : "Login and add one yourself or try again later"
            }
          />
        </div>
      )
    }
    return <Dashboard {...props} />
  }
  const mapStateToProps = ({ user, polls }) => ({ user, polls })
  return connect(mapStateToProps)(EnhancedComponent)
}
