const foxJson = require('./fox.json');
const {
  calculateSizingOptions,
  createLogoViewer,
  loadModelFromJson,
  createModelRenderer,
  createNode,
  setAttribute,
  setGradientDefinitions,
  setMaskDefinitions,
} = require('./util');

module.exports = createLogo;

function createLogo(options = {}) {
  const cameraDistance = options.cameraDistance || 400;
  const { height, width } = calculateSizingOptions(options);
  const meshJson = options.meshJson || foxJson;

  const container = createNode('svg');
  setAttribute(container, 'width', '100%');
  setAttribute(container, 'height', '100%');
  setAttribute(container, 'class', 'mm-logo');
  setAttribute(container, 'align', 'center');
  setAttribute(container, 'style', 'margin: auto; display:block');
  document.body.appendChild(container);
  const container2 = document.getElementById('logo-container');
  container2.appendChild(container);

  setGradientDefinitions(container, meshJson.gradients);
  setMaskDefinitions({ container, masks: meshJson.masks, height, width });

  const modelObj = loadModelFromJson(meshJson);
  const renderFox = createModelRenderer(container, cameraDistance, modelObj);
  const renderScene = (lookCurrent, slowDrift) => {
    const rect = container.getBoundingClientRect();
    renderFox(rect, lookCurrent, slowDrift);
  };

  return createLogoViewer(
    container,
    renderScene,
    Object.assign({ cameraDistance }, options),
  );
}
