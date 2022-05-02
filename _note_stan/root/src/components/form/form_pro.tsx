import * as React from "react";

import {form_pro, style_submit} from "./form.module.css";
// https://www.gatsbyjs.com/docs/building-a-contact-form/

// Il y a un gestionnaire de pourriel sur Netlify
// Les formulaires sont à récuprer sur le site de netlify dans le compte correspondant au site.
// https://docs.netlify.com/forms/setup/
// https: www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/#form-handling-with-static-site-generators

// https://blog.logrocket.com/how-to-style-forms-with-css-a-beginners-guide/

// https://codepen.io/cojdev/pen/LMZVqj
export function FormPro({ name, children } : any) {
  return (
    <div className={form_pro}>
      <form name={name} method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value={name} />
          <label>
            <input type="text" name="first name" placeholder="prénom" />
          </label>

          <label>
            <input type="text" name="family name" placeholder="nom" />
          </label>

          <label>
            <input type="email" name="email" placeholder="courriel" />
          </label>

          <label>
            <textarea name="message" placeholder={children}></textarea>
          </label>
        {/* <div className={style_submit}> */}
          <button type="submit">Envoyer</button>
        {/* </div> */}
      </form>
    </div>
  );
}



// export function FormPro({ name, className, children } : any) {
//   return (
//       <form className={className} name={name} method="POST" data-netlify="true">
//         <input type="hidden" name="form-name" value={name} />
  
//           <label>
//             <input type="text" name="first name" placeholder="prénom" />
//           </label>

//           <label>
//             <input type="text" name="family name" placeholder="nom" />
//           </label>

//           <label>
//             <input type="email" name="email" placeholder="courriel" />
//           </label>

//           <label>
//             <textarea name="message" placeholder={children}></textarea>
//           </label>

//         <div className="elem">
//           <button type="submit">Envoyer</button>
//         </div>
//       </form>
//   );
// }


