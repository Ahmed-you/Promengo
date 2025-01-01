import "./services/project.js";
import "./components/Header/index.js";
import "./components/Sidebar/index.js";
import "./helpers/utils.js";
import "./components/BoardsContainer/index.js";
import "./components/Models/ViewTaskModel.js";
import "./components/Models/WarningModel.js";
import "./components/Main/index.js";



// xs < 576px
// sm ≥ 576px
// md ≥ 768px
// lg ≥ 992px
// xl ≥ 1200px
// xxl ≥ 1400px
const resize = () => {
  let width = window.innerWidth;
  document.screenSize = {
    width,
    xs: 576,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };
};

resize();
window.addEventListener("resize", resize);
