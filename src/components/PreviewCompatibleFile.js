const PreviewCompatibleFile = (link) => {
  if (!link) {
    return null
  } else if (typeof link === 'string') {
    return link
  } else {
    return link.publicURL
  }
}

export default PreviewCompatibleFile
