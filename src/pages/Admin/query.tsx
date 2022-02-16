import { gql, useMutation } from "@apollo/client";

export const CREATE_CATEGORIES = gql`
    mutataion create_categories($name:String, $tags:[ID]){
 	    createCategory(input:{name:$name,tags:$tags}){
            categoryId
            name
        }
    }
    
`;
export const [create_category, { loading, data }] = useMutation(
  CREATE_CATEGORIES,
  {
    context: {
      headers: {
        authorization: `Bearer token`, //토큰 넣어주기!
      },
    },
  }
);
