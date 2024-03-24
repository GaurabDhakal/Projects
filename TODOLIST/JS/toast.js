
function createToast(type, message) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
  
    // Add progress bar (optional)
    if (type === 'progress') { 
      const progressBar = document.createElement('div');
      progressBar.classList.add('progress-bar');
      toast.appendChild(progressBar);
      animateProgressBar(progressBar);
    }
  
    document.getElementById('toast-container').appendChild(toast);
  
    setTimeout(() => toast.classList.add('show'), 10); 
  
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide'); // For smooth exit animation
      setTimeout(() => toast.remove(), 500); // Remove after transition 
    }, 3000); 
  }
  
  function animateProgressBar(progressBar) {
    let width = 1;
    const frame = () => {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        progressBar.style.width = width + '%'; 
      }
    };
    const id = setInterval(frame, 10); 
  }
  