/**
 * Account 
 * v 0.2.0
 * 2022-2022
 * */
import React from "react"
import { Router } from "@reach/router"
// GATSBY
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby";
// APP
import { login, logout, auth_token_is, get_profile } from "../../utils/auth"
import { Layout } from "../../components/layout/layout";
import { container, article } from "./user.module.css";
// declare { container, article } "./user.module.css";


const Home = ({path}) => <p>Home</p>;
const MyAccount = ({path}) => <p>My Account</p>;


function upperCase_first(word) {
  if (!word || word === undefined) {
    return word;
  }
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}


function UserAccount() {
  const user = get_profile();

  const data = useStaticQuery(
    graphql`
      query {
        allContentfulUtilisateur(filter: {titre: {eq: "Bonjour"}}) {
          edges {
            node {   
              titre
							message
            }
          }
        }
      }
    `
  );


  return(
		<div className={container}>
			<div className={article}>
        {data.allContentfulUtilisateur.edges.map(({ node }) => (
          <h1>{node.titre} {upperCase_first(user.nickname)}</h1>
        ))}
        <nav>
          {/* <Link to="/">Home</Link>{" "} */}
          {/* <Link to="/user/account/">My Account</Link>{" "} */}
          <a
            href="#logout"
            onClick={e => {
              logout()
              e.preventDefault()
            }}
          >
            Logout
          </a>
        </nav>
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        {/* <Router>
          <Home path="/" />
          <MyAccount path="/user/account/" />
        </Router> */}
    </div>
  </div> )

}

const Account = () => {
  if (!auth_token_is()) {
    login();
    return <p>Redirecting to login...</p>
  }
  return (
    <Layout>
      <UserAccount/>
    </Layout>
  );
}

export default Account;