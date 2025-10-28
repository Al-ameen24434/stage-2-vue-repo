const TICKETS_KEY = 'ticketapp_tickets';

export function getTickets(userId) {
  const ticketsData = localStorage.getItem(TICKETS_KEY);
  if (!ticketsData) return [];
  try {
    const allTickets = JSON.parse(ticketsData);
    if (userId) {
      return allTickets.filter(t => t.userId === userId);
    }
    return allTickets;
  } catch {
    return [];
  }
}

function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function createTicket(title, description, status, priority, userId) {
  const tickets = getTickets();
  const newTicket = {
    id: crypto.randomUUID(),
    title,
    description,
    status,
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId,
  };

  tickets.push(newTicket);
  saveTickets(tickets);
  return newTicket;
}

export function updateTicket(id, updates) {
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.id === id);
  
  if (index === -1) {
    throw new Error('Ticket not found');
  }

  const updatedTicket = {
    ...tickets[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  tickets[index] = updatedTicket;
  saveTickets(tickets);
  return updatedTicket;
}

export function deleteTicket(id) {
  const tickets = getTickets();
  const filteredTickets = tickets.filter(t => t.id !== id);
  saveTickets(filteredTickets);
}
