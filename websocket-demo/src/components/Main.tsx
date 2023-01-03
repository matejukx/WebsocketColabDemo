import {
    Input,
    Container,
    Avatar,
    Stack,
    Text,
    Button,
    AvatarBadge,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import ColaborativeTextArea from "./ColaborativeTextArea";


const Main = () => {
    return (
        <Container centerContent alignSelf="center">
            <ColaborativeTextArea />
        </Container>
    );
};

export default Main;
