const PreviewCompatibleFile = (link) => {
  if (typeof link === 'string') {
    return link
  } else {
    return link.publicURL
  }
}

export default PreviewCompatibleFile
