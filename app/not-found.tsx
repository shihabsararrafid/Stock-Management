import image from '@/public/Image/image.svg'
import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core'
import Link from 'next/link'
import classes from './not-found.module.css'

export default function NotFoundImage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image.src} className={classes.mobileImage} alt="Not Found Image" />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button
            component={Link}
            href="/"
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
          >
            Get back to home page
          </Button>
        </div>
        <Image src={image.src} className={classes.desktopImage} alt="Not Found Image" />
      </SimpleGrid>
    </Container>
  )
}
