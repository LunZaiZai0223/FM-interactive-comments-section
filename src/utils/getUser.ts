import juliusomo from '../assets/avatars/image-juliusomo.png';
import amyrobson from '../assets/avatars/image-amyrobson.png';
import maxblagun from '../assets/avatars/image-maxblagun.png';
import ramsesmiron from '../assets/avatars/image-ramsesmiron.png';

// 透過 function 收對應的 userName 傳 image path
// 路徑就是以這裡的函式為準，因為是從這裡 return 出去，所以其他 component 引入圖片時不會有路徑的問題
const getUserAvatar = (userName: string) => {
  switch (userName) {
    case 'juliusomo':
      return juliusomo;

    case 'amyrobson':
      return amyrobson;

    case 'maxblagun':
      return maxblagun;

    case 'ramsesmiron':
      return ramsesmiron;

    default:
      return juliusomo;
  }
};

export default getUserAvatar;
