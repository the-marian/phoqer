import { Dispatch, FC, MouseEvent, SetStateAction, useContext, useEffect, useMemo } from 'react';

import classNames from 'classnames';
import {
    Td,
    Th,
    Tr,
    TBody,
    Table,
    THead,
    TImages,
    Tooltip,
    Button,
    PlusIcon,
    Checkbox,
    useIsOpen,
    Dropdown,
    AlertIcon,
    ResetIcon,
    DeleteIcon,
    SpinnerIcon,
    Option,
    ArrowDownIcon,
    EllipsisHorizontalIcon,
    CheckmarkDoneIcon,
    TableContext,
    IconButton,
    Flex,
} from 'phoqer';

import { ImageUploadStatus, Labels } from 'src/components/uploader/uploader.type';

import css from './images-table.module.scss';

const getSizeInMb = (size: number): string => {
    if (!size) return '...';
    return Math.ceil(size / 10_000) / 100 + ' Mb';
};

interface Props {
    labels: Labels;
    isLoading: boolean;
    onOpen: () => void;
    onSubmit: () => void;
    uploads: ImageUploadStatus[];
    setUploads: Dispatch<SetStateAction<ImageUploadStatus[]>>;
    reUploadImage: (image: File) => Promise<void>;
}
export const ImagesTable: FC<Props> = ({ onOpen, onSubmit, isLoading, uploads, setUploads, reUploadImage, labels }) => {
    const dropdown = useIsOpen();

    const { selected, eventToggle, selectAll, unselectAll, setData } = useContext(TableContext);

    useEffect(() => {
        setData(uploads);
    }, [setData, uploads]);

    const isAllSelected = selected.length === uploads.length;
    const isAllUploaded = useMemo(() => uploads.every(upload => upload.done), [uploads]);

    const deleteAll = (): void => {
        setUploads([]);
    };

    const deleteSelected = (): void => {
        setUploads(prev => prev.filter((_, index) => !selected.includes(index)));
        unselectAll();
    };

    const deleteItem =
        (index: number) =>
        (event: MouseEvent<HTMLButtonElement>): void => {
            event.stopPropagation();
            setUploads(prev => prev.filter((_, innerIndex) => innerIndex !== index));
            unselectAll();
        };

    const handleReUploadImage =
        (image: File) =>
        (event: MouseEvent<HTMLButtonElement>): void => {
            event.stopPropagation();
            unselectAll();
            reUploadImage(image);
        };

    const handleOptionClick = (callback: () => void) => (): void => {
        dropdown.onToggle();
        callback();
    };

    return (
        <>
            <div className={css.head}>
                <Flex align="center" className={css.section}>
                    <Button onClick={dropdown.onOpen} size="sm" variant="secondary" className={css.mobile}>
                        <EllipsisHorizontalIcon />
                    </Button>
                    <Dropdown size="sm" isOpen={dropdown.isOpen} onClose={dropdown.onClose}>
                        <Option onClick={handleOptionClick(selectAll)}>{labels['Select all images']}</Option>
                        <Option onClick={handleOptionClick(unselectAll)}>{labels['Unselect all images']}</Option>
                        <Option onClick={handleOptionClick(deleteSelected)} disabled={!selected.length || isLoading}>
                            {labels['Delete selected']}
                        </Option>
                        <Option onClick={handleOptionClick(onOpen)}>{labels['Add new image']}</Option>
                        <Option onClick={handleOptionClick(deleteAll)}>{labels['Delete all images']}</Option>
                    </Dropdown>

                    <Tooltip label={labels['Select all images']}>
                        <Checkbox
                            size="sm"
                            className={css.tablet}
                            checked={isAllSelected}
                            label={labels['Select all images']}
                            onChange={isAllSelected ? unselectAll : selectAll}
                        />
                    </Tooltip>

                    <Tooltip label={labels['Unselect all images']}>
                        <IconButton
                            onClick={unselectAll}
                            isDisabled={isLoading}
                            label={labels['Unselect all images']}
                            className={classNames(css.ml2, css.tablet)}
                        >
                            <ResetIcon />
                        </IconButton>
                    </Tooltip>
                </Flex>

                {selected.length && !isLoading ? (
                    <Flex align="center" className={classNames(css.section, css.tablet)}>
                        <Tooltip label={labels['Delete selected']}>
                            <Button size="sm" variant="secondary" onClick={deleteSelected} rightIcon={<DeleteIcon />}>
                                {labels['Delete selected']}
                            </Button>
                        </Tooltip>
                    </Flex>
                ) : null}

                <Flex align="center" className={css.section}>
                    <Tooltip label={labels['Add new image']}>
                        <IconButton
                            label={labels['Add new image']}
                            onClick={onOpen}
                            isDisabled={isLoading}
                            className={css.tablet}
                        >
                            <PlusIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip label={labels['Delete all images']}>
                        <IconButton
                            label={labels['Delete all images']}
                            isDisabled={isLoading}
                            onClick={deleteAll}
                            className={classNames(css.tablet, css.ml2)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                    <Button
                        size="sm"
                        variant="primary"
                        className={css.ml2}
                        onClick={onSubmit}
                        isLoading={isLoading}
                        isDisabled={isAllUploaded}
                        rightIcon={<ArrowDownIcon />}
                    >
                        {labels.Upload}
                    </Button>
                </Flex>
            </div>

            <div className={css.scroll}>
                <Table>
                    <THead>
                        <Tr>
                            <Th size={10}>{labels.Image}</Th>
                            <Th size={20}>{labels.Name}</Th>
                            <Th size={15}>{labels.Size}</Th>
                            <Th size={10}>
                                <span />
                            </Th>
                            <Th size={10}>
                                <span />
                            </Th>
                            <Th size={10}>
                                <span />
                            </Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {uploads.map((row, index) => (
                            <Tr key={row.file.name + 'row'} active={selected.includes(index)} onClick={eventToggle(index)}>
                                <TImages size={10} media={row.done ? row.url : window.URL.createObjectURL(row.file)} />
                                <Td overflow size={20}>
                                    {row.file.name}
                                </Td>
                                <Td size={15}>{getSizeInMb(row.file.size)}</Td>
                                <Td size={10}>
                                    <IconButton
                                        label={labels['Delete selected']}
                                        isDisabled={isLoading}
                                        onClick={deleteItem(index)}
                                        className={css.btn}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Td>
                                <Th size={10}>
                                    {uploads[index]?.loading && (
                                        <div className={css.btn}>
                                            <SpinnerIcon />
                                        </div>
                                    )}
                                    {uploads[index]?.error && (
                                        <IconButton
                                            label={labels['Upload']}
                                            isDisabled={isLoading}
                                            className={css.btn}
                                            onClick={handleReUploadImage(row.file)}
                                        >
                                            <ResetIcon />
                                        </IconButton>
                                    )}
                                    {uploads[index]?.done && (
                                        <div className={css.btn}>
                                            <CheckmarkDoneIcon className={css.done} />
                                        </div>
                                    )}
                                </Th>
                                <Th size={10}>
                                    {uploads[index]?.error && (
                                        <div className={css.btn}>
                                            <AlertIcon className={css.error} />
                                        </div>
                                    )}
                                </Th>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>
        </>
    );
};
