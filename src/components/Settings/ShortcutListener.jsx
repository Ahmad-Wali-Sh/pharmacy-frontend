import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopingLists from '../Reports/ShopingLists/ShopingLists';
import { useNewMedicineShow } from '../States/States';

const ShortcutListener = () => {

  const [trigger, setTrigger] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Get the pressed key and modifiers
      const { key, ctrlKey, shiftKey, altKey } = event;
      const modifiers = [];
      if (ctrlKey) modifiers.push('Ctrl');
      if (shiftKey) modifiers.push('Shift');
      if (altKey) modifiers.push('Alt');

      // Build the shortcut string with modifiers and the pressed key
      const shortcut = `${modifiers.join('+')}${modifiers.length > 0 ? '+' : ''}${key}`;

      // Retrieve shortcuts from localStorage
      const generalStoredShortcuts = JSON.parse(localStorage.getItem('generalShortcuts')) || {};
      const generalMatchedShortcut = Object.entries(generalStoredShortcuts).find(([_, value]) => value === shortcut);
      // Check if the pressed shortcut matches any stored shortcut

      // Perform the corresponding action based on the matched shortcut
      switch (generalMatchedShortcut?.[0]) {
        case 'sell':
          event.preventDefault()
          navigate('/sell')
          break;
        case 'traz':
          event.preventDefault()
          setTrigger(new Date())
          break;
        case 'purchase':
          event.preventDefault()
          navigate('/purchase')
          break;
        case 'medician':
          event.preventDefault()
          navigate('/medician')
          break;
        case 'reports':
          event.preventDefault()
          navigate('/reports')
          break;
        case 'revenue':
          event.preventDefault()
          navigate('/revenue')
          break;
        default:
          break;
      }
    };

    // Add event listener for keyboard events
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Remove location from the dependency array

const { setNewMedicineShow } = useNewMedicineShow()

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Get the pressed key and modifiers
      const { key, ctrlKey, shiftKey, altKey } = event;
      const modifiers = [];
      if (ctrlKey) modifiers.push('Ctrl');
      if (shiftKey) modifiers.push('Shift');
      if (altKey) modifiers.push('Alt');

      // Build the shortcut string with modifiers and the pressed key
      const shortcut = `${modifiers.join('+')}${modifiers.length > 0 ? '+' : ''}${key}`;

      // Retrieve shortcuts from localStorage
      const generalStoredShortcuts = JSON.parse(localStorage.getItem('entranceShortcuts')) || {};
      const generalMatchedShortcut = Object.entries(generalStoredShortcuts).find(([_, value]) => value === shortcut);
      // Check if the pressed shortcut matches any stored shortcut
      // Perform the corresponding action based on the matched shortcut
      switch (generalMatchedShortcut?.[0]) {
        case 'new_medicine':
          setNewMedicineShow(new Date())
          break;
        default:
          break;
      }
    };

    // Add event listener for keyboard events
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  return (
    <ShopingLists activeKey={'traz'} button='' title='لست خرید' trigger={trigger}/>
  );
};

export default ShortcutListener;