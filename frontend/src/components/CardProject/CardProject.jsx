import "./CardProject.sass"
import { Card } from "antd";
export const CardProject = () => {
  return (
    <Card className="card-projects">
      <Card.Meta
        title="Card title"
        description="This is the description"
      >
      </Card.Meta>
      <autor>Autor</autor>
    </Card>
  )
}

export default CardProject;