import CMS from 'netlify-cms-app'
import DynamicPagePreview from './preview-templates/DynamicPagePreview'
import NewsArticlePreview from './preview-templates/NewsArticlePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('dynamic-page', DynamicPagePreview)
CMS.registerPreviewTemplate('news', NewsArticlePreview)