import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId } = auth()
  
  if (isProtectedRoute(context.request)) {
    // Check if user is signed in
    if (!userId) {
      return auth().redirectToSignIn()
    }
    
    // Check if user is an admin
    const adminUserIds = import.meta.env.ADMIN_USER_IDS?.split(',').map((id: string) => id.trim()) || []
    
    if (adminUserIds.length > 0 && !adminUserIds.includes(userId)) {
      // User is signed in but not an admin - redirect to unauthorized page
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/unauthorized'
        }
      })
    }
  }
})
