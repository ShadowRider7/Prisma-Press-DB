import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await postService.createPost(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "post created successfully.",
      data: result,
    });
  },
);
const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const posts = await postService.getAllPosts(query);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "All posts successfully fetched",
      data: posts,
    });
  },
);
const getPostsStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostsStatus();

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Post Status retrieved successfully",
      data: result,
    });
  },
);
const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;

    const result = await postService.getMyPosts(authorId as string);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "All posts retrieved.",
      data: result,
    });
  },
);
const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    if (!postId) {
      throw new Error("post Id is required");
    }
    const result = await postService.getPostById(postId as string);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "post retrieved successfully",
      data: result,
    });
  },
);
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    const postId = req.params.postId;
    const payload = req.body;

    if (!postId) {
      throw new Error("post Id is required");
    }
    await postService.updatePost(
      postId as string,
      payload,
      authorId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Post updated successfully",
      data: null,
    });
  },
);
const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    const postId = req.params.postId;

    const result = await postService.deletePost(
      postId as string,
      authorId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Post deleted successfully",
      data: result,
    });
  },
);

export const postController = {
  createPost,
  getAllPosts,
  getPostsStatus,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
