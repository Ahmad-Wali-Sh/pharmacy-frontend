import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShortcutListener = () => {
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
        switch (generalMatchedShortcut[0]) {
          case 'dashboard':
            navigate('/dashboard')
            break;
          case 'sell':
            navigate('/sell')
            break;
          case 'purchase':
            navigate('/purchase')
            break;
          case 'medician':
            navigate('/medician')
            break;
          case 'reports':
            navigate('/reports')
            break;
          case 'revenue':
            navigate('/revenue')
            break;
          case 'new_medicine':
            navigate('/medician')
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

  return null;
};

export default ShortcutListener;