import express from "express";
import categoryRoutes from "./category.routes";
import brandRoutes from "./brand.routes";

const router = express.Router();

router.use("/category", categoryRoutes);
router.use("/brand", brandRoutes);
// router.use(
//   "/conversation",
//   trimRequest.all,
//   authMiddleware,
//   conversationRoutes
// );

// router.use("/message", trimRequest.all, authMiddleware, messageRoutes);
export default router;
