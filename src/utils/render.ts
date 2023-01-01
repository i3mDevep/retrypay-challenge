type PropsType = Record<string, any>
type RenderType = (component: (props: PropsType) => string | Function, initState: PropsType, mountNode?: string ) => void

export const render: RenderType = (component, initState = {}, mountNode = 'app') => {
  initState.render = function (stateRepresentation: string) {
    const nodeInject =(document.getElementById(mountNode) || {} as HTMLElement)
    nodeInject.innerHTML = stateRepresentation;
  };

  const stateRepresentation = component(initState);
  initState.render((typeof stateRepresentation === 'function') ? stateRepresentation() : stateRepresentation);
}
