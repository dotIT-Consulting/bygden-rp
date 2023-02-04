import { Button } from "@mantine/core"

const Logs = () => {

  return (
    <Button onClick={() => { throw Error("ASD") }}>
      asd
    </Button>
  )
}

export default Logs;