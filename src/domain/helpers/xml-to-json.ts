import { XMLParser, XMLValidator } from 'fast-xml-parser'
import { CannotParseXML } from '../errors/cannot-convert-xml-to-json'

export function convertXmlToJson(xmlContent: string) {
  const isValidXML = XMLValidator.validate(xmlContent)
  if (!isValidXML) {
    throw new CannotParseXML()
  }

  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
    parseTagValue: true,
  }

  const parser = new XMLParser(options)
  return parser.parse(xmlContent)
}
