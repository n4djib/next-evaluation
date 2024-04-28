import Handlebars from "handlebars";

type MandatoryProps = {
  name: string;
  url: string;
  template: string;
};

type OptionalProps = {
  [key: string]: unknown;
};

type CompileTemplateProps = MandatoryProps & OptionalProps;

// TODO: can we send the variable params without an object
export function compileTemplate(props: CompileTemplateProps) {
  const { template, ...rest } = props;
  const handlebar_template = Handlebars.compile(template);
  const htmlBody = handlebar_template(rest);
  return htmlBody;
}
