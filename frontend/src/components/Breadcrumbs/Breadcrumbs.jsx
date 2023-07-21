import Breadcrumb from "react-bootstrap/Breadcrumb";
import "../Breadcrumbs/Breadcrumbs.css";

export default function BreadcrumbLink(props) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Shop</Breadcrumb.Item>
      <Breadcrumb.Item href={`/${props.navName}`}>
        {props.navName}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
