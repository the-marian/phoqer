import { FC } from 'react';

import { Skeleton, Tag, TagLabel, TagRightIcon } from '@chakra-ui/react';
import { omitBy, range } from 'lodash-es';
import { useGetCategories } from 'query';
import { MdAdd, MdClose } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

const skeletonList = range(10);

export const Categories: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') ?? '';

    const { data, isLoading } = useGetCategories();
    return (
        <>
            {isLoading
                ? skeletonList.map(item => (
                      <Tag size="lg" key={item} variant="outline" mr={2} mb={2}>
                          <Skeleton w="80px" h={5} />
                          <TagRightIcon as={MdAdd} />
                      </Tag>
                  ))
                : data?.map(item => {
                      const isActive = item.slug === category;
                      return (
                          <Tag
                              mr={2}
                              mb={2}
                              size="lg"
                              key={item.slug}
                              variant={isActive ? 'outline' : undefined}
                              color="common.black"
                              cursor="pointer"
                              onClick={() =>
                                  setSearchParams(prev => {
                                      const params = Object.fromEntries(Array.from(prev));
                                      return omitBy(
                                          { ...params, category: isActive ? null : item.slug },
                                          value => !value,
                                      ) as Record<string, string>;
                                  })
                              }
                          >
                              <TagLabel _dark={{ color: 'common.white' }}>{item.title}</TagLabel>
                              {isActive && <TagRightIcon as={MdClose} _dark={{ color: 'common.white' }} />}
                          </Tag>
                      );
                  })}
        </>
    );
};
