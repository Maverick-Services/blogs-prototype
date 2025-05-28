// middleware/auth.js
// import jwt from 'jsonwebtoken'
// import { connectDB } from '@/lib/mongodb'
// import User from '@/models/userModel'

// Main authentication middleware
// export function withAuth(handler, options = {}) {
//     return async (req, res) => {
//         try {
//             const token = req.headers.authorization?.replace('Bearer ', '')

//             if (!token) {
//                 return res.status(401).json({ error: 'No token provided' })
//             }

//             const decoded = jwt.verify(token, process.env.JWT_SECRET)

//             // Check if user still exists and is active
//             await connectDB()
//             const user = await User.findById(decoded.userId)

//             if (!user) {
//                 return res.status(401).json({ error: 'User not found' })
//             }

//             // Attach user info to request
//             req.user = {
//                 ...decoded,
//                 permissions: user.permissions
//             }

//             return handler(req, res)
//         } catch (error) {
//             if (error.name === 'TokenExpiredError') {
//                 return res.status(401).json({ error: 'Token expired' })
//             }
//             return res.status(401).json({ error: 'Invalid token' })
//         }
//     }
// }

// Role-based access control
// export function withRole(handler, allowedRoles = []) {
//     return withAuth(async (req, res) => {
//         if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
//             return res.status(403).json({ error: 'Insufficient permissions' })
//         }

//         return handler(req, res)
//     })
// }

// Permission-based access control
// export function withPermission(handler, resource, action) {
//     return withAuth(async (req, res) => {
//         // Admin has all permissions
//         if (req.user.role === 'admin') {
//             return handler(req, res)
//         }

//         // Check specific permission for sub-admin
//         if (req.user.role === 'sub-admin') {
//             const userPermissions = req.user.permissions
//             const resourcePermissions = userPermissions.get(resource)

//             if (!resourcePermissions || !resourcePermissions[action]) {
//                 return res.status(403).json({
//                     error: `No ${action} permission for ${resource}`
//                 })
//             }
//         }

//         // Users don't have admin permissions
//         if (req.user.role === 'user') {
//             return res.status(403).json({ error: 'Access denied' })
//         }

//         return handler(req, res)
//     })
// }

// Helper function to check permissions (for frontend)
// export const checkPermission = (user, resource, action) => {
//     if (!user) return false

//     // Admin has all permissions
//     if (user.role === 'admin') return true

//     // Users have no admin permissions
//     if (user.role === 'user') return false

//     // Check sub-admin permissions
//     if (user.role === 'sub-admin') {
//         const permissions = user.permissions
//         if (permissions && permissions[resource]) {
//             return permissions[resource][action] || false
//         }
//     }

//     return false
// }