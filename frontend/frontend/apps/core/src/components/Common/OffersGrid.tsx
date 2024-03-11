import { FC } from 'react';

import { Grid, GridItem, Image, Stack, Heading, HStack, Text, Box } from '@chakra-ui/react';
import { SlideInView, PriceTag } from 'common';
import { range } from 'lodash-es';
import Link from 'next/link';
import { OfferCard } from 'query';

const skeletonArray = range(9);
const gridTemplateAreas = `
    "area-1 area-1 area-2 area-3"
    "area-1 area-1 area-4 area-5"
    "area-6 area-7 area-8 area-8"
    "area-9 area-9 area-8 area-8"
`;

interface Props {
    isLoading?: boolean;
    data: OfferCard[];
}
export const OffersGrid: FC<Props> = ({ isLoading, data }) => {
    return (
        <Grid
            gridGap={4}
            gridTemplateAreas={gridTemplateAreas}
            gridTemplateColumns="repeat(4, 1fr)"
            gridTemplateRows="repeat(4, 250px)"
        >
            {isLoading
                ? skeletonArray.map(index => (
                      <GridItem key={index} gridArea={`area-${index + 1}`}>
                          <Box h="100%" w="100%" borderRadius="1em" bg="gray.200" _dark={{ bg: 'gray.700' }} />
                      </GridItem>
                  ))
                : data?.slice(0, skeletonArray.length)?.map((offer, index) => {
                      const isLarge = index === 0 || index === 7 || index === 8;
                      const borderRadius = isLarge ? '1.8em' : '1.2em';

                      return (
                          <GridItem key={offer.id} gridArea={`area-${index + 1}`}>
                              <SlideInView>
                                  <Stack
                                      as={Link}
                                      href={`/offers/${offer.id}`}
                                      h="100%"
                                      w="100%"
                                      position="relative"
                                      _before={{
                                          content: '""',
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                          h: '100%',
                                          w: '100%',
                                          zIndex: 1,
                                          borderRadius,
                                          bg: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 70%)',
                                      }}
                                      _hover={{
                                          '.offer-blur': {
                                              bg: 'rgba(255, 255, 255, 0.05)',
                                              boxShadow: '-1px -1px 0px 0px var(--chakra-colors-gray-600)',
                                          },
                                      }}
                                  >
                                      <Image
                                          h="100%"
                                          w="100%"
                                          src={offer.image}
                                          alt={offer.title}
                                          objectFit="cover"
                                          borderRadius={borderRadius}
                                      />

                                      <HStack
                                          p="5%"
                                          zIndex={2}
                                          left="3%"
                                          bottom={isLarge ? '1em' : '0.6rem'}
                                          spacing={4}
                                          position="absolute"
                                          alignItems="center"
                                          w="calc(100% - 6%)"
                                          bg="rgba(255, 255, 255, 0.1)"
                                          borderRadius={isLarge ? '2em' : '1em'}
                                          backdropFilter="blur(1rem)"
                                          className="offer-blur"
                                          transition="0.2s ease-in-out"
                                          boxShadow="-1px -1px 0px 0px var(--chakra-colors-gray-700)"
                                      >
                                          <Stack flex={1} spacing={1}>
                                              <Heading
                                                  size={isLarge ? 'md' : 'xs'}
                                                  noOfLines={1}
                                                  wordBreak="break-all"
                                                  color="common.white"
                                              >
                                                  {offer.title}
                                              </Heading>

                                              {isLarge && (
                                                  <Text size="sm" color="common.white">
                                                      {offer.category}
                                                  </Text>
                                              )}
                                          </Stack>
                                          <PriceTag
                                              sale={offer.sale}
                                              price={offer.price}
                                              bg="common.white"
                                              color="text.main"
                                              size={isLarge ? 'lg' : 'md'}
                                              borderRadius="0.7em"
                                          />
                                      </HStack>
                                  </Stack>
                              </SlideInView>
                          </GridItem>
                      );
                  })}
        </Grid>
    );
};
