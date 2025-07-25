// "use client";
// import React, { useContext, useEffect, useState } from 'react';
// import { supabase } from '@/services/supabaseClient';
// import { UserDetailContext } from '@/context/UserDetailContext';

// function Provider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//   const fetchUser = async () => {
//     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

//     if (sessionError || !sessionData.session) {
//       console.warn("⚠️ No active session found.");
//       return;
//     }

//     const supaUser = sessionData.session.user;
//     console.log("✅ Supabase user:", supaUser);

//     const { data: existingUsers, error: fetchError } = await supabase
//       .from('Users')
//       .select('*')
//       .eq('email', supaUser.email); // ✅ Fix: no quotes here!

//     if (fetchError) {
//       console.error("❌ Error fetching user from DB:", fetchError);
//       return;
//     }

//     if (!existingUsers || existingUsers.length === 0) {
//       const { data: insertedData, error: insertError } = await supabase
//         .from("Users")
//         .insert([{
//           name: supaUser.user_metadata?.name,
//           email: supaUser.email,
//           picture: supaUser.user_metadata?.picture, // ✅ Typo fixed from `picutre`
//         }])
//         .select();

//       if (insertError) {
//         console.error("❌ Error inserting user:", insertError);
//         return;
//       }

//       setUser(insertedData[0]);
//     } else {
//       setUser(existingUsers[0]);
//     }
//   };

//   fetchUser();
// }, []);


//   return (
//     <UserDetailContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserDetailContext.Provider>
//   );
// }

// export default Provider;

// export const useUser = () => {
//   const context = useContext(UserDetailContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserDetailProvider");
//   }
//   return context;
// };




// "use client"
// import React, { useContext, useEffect, useState } from 'react';
// import {supabase} from '@/services/supabaseClient'
// import { UserDetailContext } from '@/context/UserDetailContext';

// function Provider({children}){

//       const [user,setUser]=useState(null);

//       useEffect(()=>{
//             CreateNewUser();
//       },[]);
//       const CreateNewUser=()=>{
//             supabase.auth.getUser().then(async({data:{user}})=>{
//                   let { data: Users, error } = await supabase
//                         .from('Users')
//                         .select("*")
//                         .eq('email', 'user?.email');
//                   console.log(users)

//                   if(Users?.length==0){
//                         await supabase.from("Users")
//                         .insert([{
//                               name:user?.user_metadata?.name,
//                               email:user?.email,
//                               picutre:user?.user_metadata?.picture

//                         }])
//                         console.log(data);
//                         setUser(data);
//                         return;
//                   }
//                   setUser(Users[0]);
//             }) 

//       }
//       return (
//             <UserDetailContext.Provider value={{user, setUser}}>
//                   <div>{children}</div>
//             </UserDetailContext.Provider>            
//       )
// }
// export default Provider;

// export const useUser=()=>{
//       const context=useContext(UserDetailContext);
//       return context;
// }


"use client";

import React, { useContext, useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        console.warn("⚠️ No active session found.");
        return;
      }

      const supaUser = sessionData.session.user;
      if (!supaUser?.email) {
        console.warn("⚠️ Supabase user or email missing");
        return;
      }

      const userPayload = {
        name: supaUser.user_metadata?.name || "Anonymous",
        email: supaUser.email,
        picture: supaUser.user_metadata?.picture || "/default-avatar.png",
        credits: 3,
      };

      console.log("📦 Upserting user:", userPayload);

      const { data: upsertedData, error: upsertError } = await supabase
        .from("Users")
        .upsert([userPayload], { onConflict: ['email'] })
        .select();

      if (upsertError) {
        console.error("❌ Error upserting user:", upsertError.message || upsertError);
        return;
      }

      console.log("✅ User upserted or fetched:", upsertedData?.[0]);
      setUser(upsertedData?.[0] || null);
    };

    fetchUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used within a UserDetailProvider");
  }
  return context;
};
