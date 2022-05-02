/**
 * Callback
 * v 0.1.0
 * 2022-2022
 * */
 import React from "react"
 // gatsby
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby"

 // APP
 import { logout } from "../../utils/auth"
import { Layout } from "../../components/layout/layout";
import { container, article } from "./user.module.css";

function Welcome() {
	const data = useStaticQuery(
    graphql`
      query {
        allContentfulUtilisateur(filter: {titre: {eq: "Bienvenue"}}) {
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
          <h1>{node.titre}</h1>
        ))}
			 <nav>
				{data.allContentfulUtilisateur.edges.map(({ node }) => (
					<Link to="/user/account/">{node.message}</Link>
        ))}{" | "}<a
								 href="#logout"
								 onClick={e => {
									 logout()
									 e.preventDefault()
								 }}
							 >
								 Logout
							 </a>
			 </nav>
			 </div>

		</div>

	)
}
 
 const Callback = () => {
	 return(
		 <Layout>
			 <Welcome/>
		 </Layout>
	 )
 }
 
 export default Callback
 