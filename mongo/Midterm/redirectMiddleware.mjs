// redirectMiddleware.js
import { copyFile } from 'fs';
import fs from 'fs/promises';
import path from 'path'

// 工厂函数，接受配置文件路径
const redirectMiddleware = (configPath) => {
  let redirects = {};

  // 异步加载重定向配置
  const loadRedirects = async () => {
    try {
      const data = await fs.readFile(configPath);
      redirects = JSON.parse(data);
    } catch (error) {
      console.error('Error reading redirect file:', error);
    }
  };
  // 立即加载配置
  loadRedirects();
  
  // 返回实际的中间件函数
  return async (req, res, next) => {
    const target = redirects[req.path];
    if (target) {
      console.log(`Redirecting from ${req.path} to ${target}`);
      res.redirect(target);
    } else {
      next();
    }
  };
};

export default redirectMiddleware;
