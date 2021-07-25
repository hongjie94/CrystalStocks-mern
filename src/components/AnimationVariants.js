const AnimationVariants = () => {

  // Enter pages
  const EnterPageVariant = {
    Enter: {
      opacity: 0,
      y : '-100vh'
    },
    End: {
      opacity: 1,
      y: 0,
      transition: { 
        when: 'beforeChildren',
        ease: 'easeIn'
      } 
    }
  };

  // Auth
  const BoxVariant = {
    Enter: {
      opacity: 0, 
      scale : 0
    },
    End: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: .5,
        // duration: .5,
        ease: 'easeOut'
      }
    }
  };

  // Favorites
  const RemoveListsVariant = {
    Remove: {
      opacity: [1, .75, .5, .25, 0],
      transition: {
        ease: 'easeInOut',
        duration: .5
      }
    }
  };

  // Browse
  const BrowseTabsVariant = {
    Enter: { y: '-30vh' },
    End: {
      y: 0,
      transition: { 
        when: 'beforeChildren',
        ease: 'easeIn'
      }
    }
  };

  //  Markets
  const MarketsHeaderVariant = {
    Enter: { y: '-60vh' },
    End: {
      y: 0,
      transition: { 
        ease: 'easeIn'
      }
    }
  };

  const MarketRowVariant = {
    Enter: { y: '100vw' },
    End: {
      y: 0,
      transition: { 
        duration: 0.5
      }
    }
  };

  const StarIconVariant = {
    OnHover: {
      scale: 1.2,
      textShadow: '0px 0px 8px hsl(45, 100%, 60%)',
      transition: {
        duration: .5,
        yoyo: Infinity
      }
    }
  };
  
  return {
    BoxVariant,
    MarketsHeaderVariant, 
    MarketRowVariant, 
    StarIconVariant, 
    EnterPageVariant, 
    RemoveListsVariant,
    BrowseTabsVariant 
  };
}; 

export default AnimationVariants;
