package com.techelevator.controller;

import com.techelevator.dao.InvitationDao;
import com.techelevator.model.Invitation;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
//@PreAuthorize("isAuthenticated()")
public class InvitationController {
    private InvitationDao invitationDao;

    public InvitationController(InvitationDao invitationDao) {
        this.invitationDao = invitationDao;
    }

    @GetMapping(path="/invitations/{id}")
    public List<Invitation> getAllInvitations(@PathVariable int id) {
        return invitationDao.getInvitations(id);
    }

    @GetMapping(path="/invitation/{id}")
    public Invitation getInvitation(@PathVariable int id) {
        return invitationDao.getInvitation(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path="/invitation/create")
    public boolean createInvitation(@RequestBody Invitation invitation) {
        return invitationDao.createInvitation(invitation);
    }

    @PostMapping(path="/invitation/update") //"/invitation/update{id}"
    public boolean updateInvitation(@RequestBody Invitation invitation) {
        return invitationDao.updateInvitation(invitation);
    }

}
