import { Box, Button, Card, DragHandle, Flex, Icon, Popover, TextInput } from '@contentful/f36-components';
import { css } from 'emotion';
import { useState } from 'react';
import { DeleteIcon } from '@contentful/f36-icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Color, ColorPicker, toColor, useColor } from 'react-color-palette';

import "react-color-palette/lib/css/styles.css";

const inputStyles = {
  outline: 'none',
  boxShadow: 'inset 0px 2px 0px rgba(225,228,232,0.2)',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  border: '1px solid #CFD9E0',
  borderRadius: '6px',
  color: '#414D63',
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  padding: '10px 0.75rem',
  margin: 0,
  cursor: 'auto',
  width: '100%',
  zIndex: 1,
  height: '40px',
  maxHeight: '40px',
}

export const ConfigColorBar = ({ id, label, hexColor, onChange }: any) => {
  const [color, setColor] = useColor('hex', hexColor);
  const [isOpen, setIsOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, active } = useSortable({ id });

  const zIndex = active && active.id === id ? 1 : 0;
    const style = {
      transform: CSS.Translate.toString(transform),
      transition,
      zIndex,
    };

  const setLabelValue = (e: any) => {
    const { value } = e.target;

    onChange({ id, label: value });
  }

  const handleChange = (color: Color | string) => {
    if (typeof color === 'string') {
      const colorObject = toColor("hex", color);
      setColor(colorObject)
      onChange({ id, hexColor: colorObject.hex });
    } else {
      setColor(color);
      onChange({ id, hexColor: color.hex })
    }
  }

  return (
    <Card
      className={css({ position: 'relative', marginBottom: '1rem' })}
      dragHandleRender={() => (
        <DragHandle
          as={'button'}
          className={css({ alignSelf: 'stretch' })}
          label={'Move card'}
          {...attributes}
          {...listeners}
        />
        )}
      padding="none"
      withDragHandle
      ref={setNodeRef}
      style={style}
    >
      <Flex
        padding={'spacingM'}
        alignItems={'center'}
        justifyContent={'center'}
        className={css({
          gap: '1rem'
        })}
      >
        <Popover placement={'right-start'} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Popover.Trigger>
            <Box
              onClick={() => setIsOpen(!isOpen)}
              className={css({
                backgroundColor: hexColor,
                width: '40px',
                height: '40px',
                border: '1px solid #CFD9E0',
                borderRadius: '6px',
                cursor: 'pointer',
                flexShrink: 0
              })}
            />
          </Popover.Trigger>
          <Popover.Content className={css({ margin: '1rem' })}>
            <Box>
              <ColorPicker width={456} height={228} color={color} onChange={handleChange} />
            </Box>
          </Popover.Content>
        </Popover>
        {/* @ts-ignore */}
        <TextInput value={hexColor} onChange={(e) => handleChange(e.target.value)} />
        <TextInput value={label} onChange={(e) => setLabelValue(e)} />
        <Button onClick={() => onChange({ id, remove: true })}>
          <DeleteIcon variant={'negative'} />
        </Button>
      </Flex>
    </Card>
  )
}