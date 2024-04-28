import { memo, useCallback } from "react";
import { Tag as ChakraTag, TagCloseButton, TagLabel } from "@chakra-ui/react";

interface TagProps {
  label: string;
  id: string;
  onClose?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const Tag = memo(({ label, id, onClick, onClose }: TagProps) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [id, onClick]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose(id);
    }
  }, [id, onClose]);

  return (
    <ChakraTag
      size="md"
      key={id}
      borderRadius="full"
      variant="solid"
      colorScheme="green"
      onClick={handleClick}
    >
      <TagLabel>{label}</TagLabel>
      <TagCloseButton onClick={handleClose} />
    </ChakraTag>
  );
});

Tag.displayName = "Tag";
