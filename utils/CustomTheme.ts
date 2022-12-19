import type { ButtonStylesParams, MantineTheme, MantineThemeOverride } from "@mantine/core";

const getVariantStyles = (
  theme: MantineTheme,
  params: ButtonStylesParams
) => {
  switch(params.variant) {
    case 'outline':
      return {
        root: {
          backgroundColor: 'transparent',
          borderRadius: 0,
          color: 'white',
          borderColor: 'white',
          '&:hover': {
            color: 'black',
            backgroundColor: 'white'
          }
        }
      }
    case 'filled':
      return {
        root: {
          borderRadius: 0,
          color: 'black',
          backgroundColor: 'white',
          '&:hover': {
            color: 'white',
            backgroundColor: 'black',
          }
        }
      }
    case 'subtle': 
      return {
        root: {
          color: 'white',
          borderRadius: 0,
          '&:hover': {
            color: 'black',
            backgroundColor: 'transparent'
          }
        }
      }

    case 'default': {
      return {
        root: {
          borderRadius: 0,
          color: 'black',
          backgroundColor: 'white',
        }
      }
    }
    default:
      break;
  }
};

const CustomTheme = {
  colorScheme: 'dark',
  globalStyles: () => ({
    body: {
      backgroundColor: 'black',
      overflow: 'hidden'
    }
  }),
  components: {
    Button: {
      styles: (theme, params) => ({
        ...getVariantStyles(theme, params)
      })
    },
    Title: {
      defaultProps: {
        color: 'white'
      }
    },
    Text: {
      defaultProps: {
        color: 'white'
      }
    },
    Card: {
      styles: () => ({
        root: {
          backgroundColor: '#26272c !important',
          '&:hover': {
            backgroundColor: '#323439 !important',
          }
        }
      })
    }
  }
} as MantineThemeOverride

export {
  CustomTheme
}