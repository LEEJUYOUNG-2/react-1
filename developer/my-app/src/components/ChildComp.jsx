
export default function ChildComp({imageInfo, width=300, height=100}) {
  return (
    <>
      <img src={imageInfo.src} alt={imageInfo.src} width={width} height={height} />
    </>
  )
}